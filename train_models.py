import os
from pathlib import Path
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, accuracy_score, mean_squared_error, r2_score


def train_crop_recommendation(
    data_path: str = "data/crop_recommendation_india.csv",
    model_path: str = "models/crop_recommendation_model.pkl",
    random_state: int = 42,
):
    data_file = Path(data_path)
    if not data_file.exists():
        raise FileNotFoundError(f"Dataset not found: {data_file}")

    df = pd.read_csv(data_file)
    if "label" not in df.columns:
        raise ValueError("Dataset must contain a 'label' column")

    features = [c for c in df.columns if c != "label"]
    X = df[features]
    y = df["label"].astype(str)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, stratify=y, random_state=random_state
    )

    label_encoder = LabelEncoder()
    y_train_enc = label_encoder.fit_transform(y_train)
    y_test_enc = label_encoder.transform(y_test)

    pipeline = Pipeline(
        [
            ("scaler", StandardScaler()),
            (
                "classifier",
                RandomForestClassifier(
                    n_estimators=200,
                    random_state=random_state,
                    n_jobs=-1,
                ),
            ),
        ]
    )

    pipeline.fit(X_train, y_train_enc)

    y_pred = pipeline.predict(X_test)
    accuracy = accuracy_score(y_test_enc, y_pred)
    report = classification_report(
        y_test_enc, y_pred, target_names=label_encoder.classes_, zero_division=0
    )

    artifact = {
        "pipeline": pipeline,
        "label_encoder": label_encoder,
        "features": features,
        "accuracy": accuracy,
    }

    model_file = Path(model_path)
    model_file.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(artifact, model_file)

    print(f"Saved trained model to: {model_file}")
    print(f"Features: {features}")
    print(f"Accuracy: {accuracy:.4f}")
    print("Classification report:\n", report)

    return artifact


def train_crop_price_prediction(
    data_path: str = "data/crop_price_dataset.csv",
    model_path: str = "models/crop_price_regression_model.pkl",
    random_state: int = 42,
    test_size: float = 0.2,
):
    data_file = Path(data_path)
    if not data_file.exists():
        raise FileNotFoundError(f"Dataset not found: {data_file}")

    df = pd.read_csv(data_file)
    required_columns = [
        "month",
        "commodity_name",
        "avg_modal_price",
        "avg_min_price",
        "avg_max_price",
        "change",
    ]
    missing = [c for c in required_columns if c not in df.columns]
    if missing:
        raise ValueError(f"Dataset must contain columns: {missing}")

    df["commodity_name"] = df["commodity_name"].astype(str).str.strip()
    df["month"] = pd.to_datetime(df["month"], errors="coerce")
    for column in ["avg_modal_price", "avg_min_price", "avg_max_price", "change"]:
        df[column] = pd.to_numeric(df[column], errors="coerce")

    df = df.dropna(subset=["month", "commodity_name", "avg_modal_price", "avg_min_price", "avg_max_price", "change"])

    df["month_num"] = df["month"].dt.month
    df["year"] = df["month"].dt.year
    df["month_index"] = df["month"].dt.to_period("M").astype(str)

    features = ["commodity_name", "month_num", "year", "avg_min_price", "avg_max_price", "change"]
    X = df[features]
    y = df["avg_modal_price"]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=test_size,
        random_state=random_state,
    )

    preprocessor = ColumnTransformer(
        [
            ("categorical", OneHotEncoder(handle_unknown="ignore", sparse_output=False), ["commodity_name"]),
            ("numeric", StandardScaler(), ["month_num", "year", "avg_min_price", "avg_max_price", "change"]),
        ]
    )

    regressor = RandomForestRegressor(
        n_estimators=300,
        random_state=random_state,
        n_jobs=-1,
    )

    pipeline = Pipeline(
        [
            ("preprocessor", preprocessor),
            ("regressor", regressor),
        ]
    )

    pipeline.fit(X_train, y_train)

    y_pred = pipeline.predict(X_test)
    r2 = r2_score(y_test, y_pred)
    rmse = mean_squared_error(y_test, y_pred) ** 0.5

    artifact = {
        "pipeline": pipeline,
        "features": features,
        "target": "avg_modal_price",
        "r2_score": r2,
        "rmse": rmse,
    }

    model_file = Path(model_path)
    model_file.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(artifact, model_file)

    print(f"Saved trained price model to: {model_file}")
    print(f"Features: {features}")
    print(f"R^2: {r2:.4f}")
    print(f"RMSE: {rmse:.4f}")

    return artifact


def train_crop_yield_recommendation(
    data_path: str = "data/crop_yield.csv",
    model_path: str = "models/crop_yield_regression_model.pkl",
    random_state: int = 42,
    test_size: float = 0.2,
):
    data_file = Path(data_path)
    if not data_file.exists():
        raise FileNotFoundError(f"Dataset not found: {data_file}")

    df = pd.read_csv(data_file)
    required_columns = [
        "Crop",
        "Crop_Year",
        "Season",
        "State",
        "Area",
        "Production",
        "Annual_Rainfall",
        "Fertilizer",
        "Pesticide",
        "Yield",
    ]
    missing = [c for c in required_columns if c not in df.columns]
    if missing:
        raise ValueError(f"Dataset must contain columns: {missing}")

    for column in ["Crop", "Season", "State"]:
        df[column] = df[column].astype(str).str.strip()

    for column in ["Crop_Year", "Area", "Production", "Annual_Rainfall", "Fertilizer", "Pesticide", "Yield"]:
        df[column] = pd.to_numeric(df[column], errors="coerce")

    df = df.dropna(subset=["Crop", "Season", "State", "Crop_Year", "Area", "Production", "Annual_Rainfall", "Fertilizer", "Pesticide", "Yield"])

    categorical_features = ["Crop", "Season", "State"]
    numeric_features = [
        "Crop_Year",
        "Area",
        "Production",
        "Annual_Rainfall",
        "Fertilizer",
        "Pesticide",
    ]
    features = categorical_features + numeric_features

    X = df[features]
    y = df["Yield"]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=test_size,
        random_state=random_state,
    )

    preprocessor = ColumnTransformer(
        [
            (
                "categorical",
                OneHotEncoder(handle_unknown="ignore", sparse_output=False),
                categorical_features,
            ),
            ("numeric", StandardScaler(), numeric_features),
        ]
    )

    regressor = RandomForestRegressor(
        n_estimators=300,
        max_depth=None,
        min_samples_split=2,
        min_samples_leaf=1,
        random_state=random_state,
        n_jobs=-1,
    )

    pipeline = Pipeline(
        [
            ("preprocessor", preprocessor),
            ("regressor", regressor),
        ]
    )

    pipeline.fit(X_train, y_train)

    y_pred = pipeline.predict(X_test)
    r2 = r2_score(y_test, y_pred)
    rmse = mean_squared_error(y_test, y_pred) ** 0.5

    artifact = {
        "pipeline": pipeline,
        "features": features,
        "r2_score": r2,
        "rmse": rmse,
        "target": "Yield",
    }

    model_file = Path(model_path)
    model_file.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(artifact, model_file)

    print(f"Saved trained model to: {model_file}")
    print(f"Features: {features}")
    print(f"R^2: {r2:.4f}")
    print(f"RMSE: {rmse:.4f}")

    return artifact


if __name__ == "__main__":
    train_crop_yield_recommendation()
    train_crop_price_prediction()

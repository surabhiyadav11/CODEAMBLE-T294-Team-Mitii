import os
import re
import glob

features_dir = r"c:\Users\surab\.gemini\antigravity\scratch\PINK_FINAL_TEAM_MITTI\src\components\features"

def patch_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add lang: 'English' to the inputs state if not present
    if "lang: 'English'" not in content:
        content = re.sub(
            r'(const \[inputs,\s*setInputs\]\s*=\s*useState\(\{[\s\S]*?)(?=\}\);)',
            r"\1,\n    lang: 'English'\n  ",
            content
        )

    # 2. Append &lang=... to fetch URL
    def add_lang_to_url(match):
        url = match.group(1)
        if '&lang=' not in url and '?lang=' not in url:
            if '?' in url:
                url += r'&lang=${encodeURIComponent(inputs.lang)}'
            else:
                url += r'?lang=${encodeURIComponent(inputs.lang)}'
        return f'fetch(`{url}`)'
    
    content = re.sub(r'fetch\(`([^`]+)`\)', add_lang_to_url, content)
    
    # 3. Modify Grid columns from 2 to 3
    content = re.sub(r'(grid-cols-1 md:grid-cols-)2', r'\g<1>3', content)
    
    # 4. Add Language Dropdown JSX
    dropdown_jsx = """          <div>
            <label className="block text-[11px] font-black text-maroon/60 uppercase tracking-widest mb-1.5 ml-1">Language</label>
            <div className="flex items-center gap-2 bg-white rounded-2xl border border-creamLine p-2.5 shadow-sm focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/10">
              <select className="bg-transparent border-none outline-none text-sm w-full font-semibold text-maroon" value={inputs.lang} onChange={e => setInputs({...inputs, lang: e.target.value})}>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Marathi">Marathi</option>
                <option value="Telugu">Telugu</option>
                <option value="Tamil">Tamil</option>
                <option value="Kannada">Kannada</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Bengali">Bengali</option>
                <option value="Punjabi">Punjabi</option>
              </select>
            </div>
          </div>
        </div>
        <button 
          onClick={fetchData}"""

    # Replace the closing </div> of the grid + button with our new dropdown + button
    if "Language" not in content:
        content = re.sub(
            r'\s*</div>\s*<button\s+onClick=\{fetchData\}',
            '\n' + dropdown_jsx,
            content
        )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Patched {os.path.basename(filepath)}")

for file in glob.glob(os.path.join(features_dir, "*.jsx")):
    patch_file(file)

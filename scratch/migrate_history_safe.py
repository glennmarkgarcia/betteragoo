# -*- coding: utf-8 -*-
import os
import re

BASE_DIR = r"C:\github\betteragoo"
INDEX_HTML = os.path.join(BASE_DIR, "index.html")
TRANSLATIONS_JS = os.path.join(BASE_DIR, "assets", "js", "translations.js")
LANG_CONTEXT = os.path.join(BASE_DIR, "react-app", "src", "contexts", "LanguageContext.tsx")

# List of keys to remove
KEYS_TO_REMOVE = {
    'home-history-1760',
    'home-history-1767',
    'home-history-1768',
    'home-governor-general-antonio-urbiztondo-declared',
    'home-history-1853',
    'home-history-1889',
    'home-history-1957',
    'home-once-the-largest',
    'home-agoo-was-the-largest-municipality-in-the',
    'home-urban-planning',
    'home-the-1889-redevelopment-created-a-grid-of-100'
}

def clean_translations_js():
    with open(TRANSLATIONS_JS, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    lines = content.split('\n')
    new_lines = []
    i = 0
    removed_count = 0
    
    while i < len(lines):
        line = lines[i]
        matched_key = None
        for key in KEYS_TO_REMOVE:
            if f"'{key}'" in line:
                matched_key = key
                break
                
        if matched_key:
            # Skip this line
            removed_count += 1
            # If the next line is a multi-line string value (starts with indentation and a quote)
            # we should skip it as well
            if i + 1 < len(lines) and (lines[i+1].strip().startswith("'") or lines[i+1].strip().startswith('"')):
                i += 2
            else:
                i += 1
        else:
            new_lines.append(line)
            i += 1
            
    content_cleaned = '\n'.join(new_lines)
    
    # Now insert the new keys in the English, Tagalog, and Ilocano blocks.
    en_new = """    'home-history-1578': 'Agoo was founded as a settlement by Franciscan friars, Father John Baptist Lucarelli and Father Sebastian de Baeza, and dedicated to Santa Monica.',
    'home-history-1582': 'Administered by Augustinian missionaries who named the town Agoo, after the "aroo" or pine-like Casuarina trees lining the coast.',
    'home-history-precolonial': 'Known as "Puerto de Japón," Agoo was a bustling pre-colonial international port trading with Japanese, Chinese, and Ryukyuan merchants.',
    'home-history-1850': 'Agoo was integrated into the newly created province of La Union, signed into law by Governor-General Antonio Maria Blanco.',
    'home-history-1978': 'Marking its 400th founding anniversary, the parish church was elevated to a Basilica Minore (Our Lady of Charity) by Pope John Paul II.',
    'home-history-present': 'Agoo thrives as a key educational and cultural center in La Union, celebrating its heritage through the annual Dinengdeng Festival.',
    'home-basilica-town': 'The Basilica Town',
    'home-basilica-town-desc': 'Agoo is one of the oldest settlements in the region, home to the Basilica Minore of Our Lady of Charity.',
    'home-puerto-de-japon': 'Puerto de Japón',
    'home-puerto-de-japon-desc': 'Before Spanish colonizers closed the port, Agoo was a bustling center of trade for Japanese, Chinese, and Ryukyuan merchants',"""

    tl_new = """    'home-history-1578': 'Itinatag ang Agoo bilang isang pamayanan ng mga paring Pransiskano na sina Padre John Baptist Lucarelli at Padre Sebastian de Baeza, at inialay kay Santa Monica.',
    'home-history-1582': 'Pinamahalaan ng mga misyonerong Agustino na nagpangalan sa bayan bilang Agoo, mula sa "aroo" o mga mala-pain na puno ng Casuarina sa baybayin.',
    'home-history-precolonial': 'Kilala bilang "Puerto de Japón," ang Agoo ay isang masiglang daungang pandaigdig bago ang kolonisasyon na nakikipagkalakalan sa mga Hapones, Tsino, at Ryukyuan.',
    'home-history-1850': 'Isinama ang Agoo sa bagong tatag na lalawigan ng La Union, na nilagdaan ni Gobernador-Heneral Antonio Maria Blanco.',
    'home-history-1978': 'Sa ika-400 taong anibersaryo ng pagkakatatag nito, ang parokya ay itinaas bilang Basilica Minore ng Nuestra Señora de Caridad ni Papa Juan Pablo II.',
    'home-history-present': 'Patuloy na umuunlad ang Agoo bilang sentro ng edukasyon at kultura sa La Union, at ipinagdiriwang ang pamana nito sa pamamagitan ng taunang Dinengdeng Festival.',
    'home-basilica-town': 'Ang Bayan ng Basilica',
    'home-basilica-town-desc': 'Ang Agoo ay isa sa mga pinakalumang pamayanan sa rehiyon, tahanan ng Basilica Minore ng Nuestra Señora de Caridad.',
    'home-puerto-de-japon': 'Puerto de Japón',
    'home-puerto-de-japon-desc': 'Bago isinara ng mga Kastila ang daungan, ang Agoo ay naging abalang sentro ng kalakalan para sa mga Hapones, Tsino, at Ryukyuan.',"""

    ilo_new = """    'home-history-1578': 'Naipasdek ti Agoo kas maysa a pagtaengan babaen kadagiti pader a Pransiskano a da Padre John Baptist Lucarelli ken Padre Sebastian de Baeza, ken naidaton ken Santa Monica.',
    'home-history-1582': 'Inurnos dagiti misionero nga Agustino a nangipanagan iti ili kas Agoo, manipud iti "aroo" wenno kasla pino a kaykayo a Casuarina iti igid ti baybay.',
    'home-history-precolonial': 'Naam-ammo kas "Puerto de Japón," ti Agoo ket maysa a nabiag nga internasional a puerto sakbay ti kolonisasion a nakilinnako kadagiti Hapon, Tsino, ken Ryukyuan.',
    'home-history-1850': 'Nairaman ti Agoo iti baro a naipasdek a probinsia ti La Union, a pinirmaan ni Gobernador-Heneral Antonio Blanco.',
    'home-history-1978': 'Iti maika-400 nga anibersario ti pannakapasdekna, ti simbaan ti parokia ket naitan-ok kas Basilica Minore ti Nuestra Señora de Caridad babaen ken Papa Juan Pablo II.',
    'home-history-present': 'Rumang-ay ti Agoo kas kangrunaan a sentro ti edukasion ken kultura iti La Union, a mangrambak iti tawidna babaen ti tinawen a Dinengdeng Festival.',
    'home-basilica-town': 'Ti Ili ti Basilica',
    'home-basilica-town-desc': 'Ti Agoo ket maysa kadagiti kabakangan a pagtaengan iti rehion, a pagtaengan ti Basilica Minore ti Nuestra Señora de Caridad.',
    'home-puerto-de-japon': 'Puerto de Japón',
    'home-puerto-de-japon-desc': 'Sakbay a nangrikep dagiti Kastila iti puerto, ti Agoo ket maysa a masiblag a sentro ti komersio para kadagiti Hapon, Tsino, ken Ryukyuan.',"""

    # EN block target
    content_cleaned = content_cleaned.replace(
        "'home-brief-history-of-agoo': 'Brief History of Agoo',",
        "'home-brief-history-of-agoo': 'Brief History of Agoo',\n" + en_new
    )
    # TL block target
    content_cleaned = content_cleaned.replace(
        "'home-brief-history-of-agoo': 'Maikling Kasaysayan ng Agoo',",
        "'home-brief-history-of-agoo': 'Maikling Kasaysayan ng Agoo',\n" + tl_new
    )
    # ILO block target
    content_cleaned = content_cleaned.replace(
        "'home-brief-history-of-agoo': 'Pabassit a Pakasaritaan ti Agoo',",
        "'home-brief-history-of-agoo': 'Pabassit a Pakasaritaan ti Agoo',\n" + ilo_new
    )
    
    with open(TRANSLATIONS_JS, 'w', encoding='utf-8') as f:
        f.write(content_cleaned)
    print(f"Cleaned and migrated translations.js. Removed {removed_count} keys.")

def main():
    migrate_index_html()
    clean_translations_js()
    # The LanguageContext.tsx was already successfully migrated by the previous run,
    # except we manually ran the Ilocano replacement which succeeded.
    # We can run migrate_history.py again or just verify it's fine.
    
if __name__ == "__main__":
    from migrate_history import migrate_index_html
    main()

import re

with open("frontend/src/app/globals.css", "r") as f:
    css = f.read()

# Define the variable block strings using regex to extract them
light_pattern = r'(--section-header-border:.*?)(\s*--archive-card-bg-gradient:)'
dark_pattern = r'(--section-header-border:.*?)(\s*--archive-card-bg-gradient:)'

# Find the blocks
light_match = re.search(light_pattern, css[:css.find('html[data-color-theme="dark"]')], re.DOTALL)
light_vars = light_match.group(1)

dark_search_space = css[css.find('html[data-color-theme="dark"]'):]
dark_match = re.search(dark_pattern, dark_search_space, re.DOTALL)
dark_vars = dark_match.group(1)

# Remove them from their original locations
css = css.replace(light_vars, "")
css = css.replace(dark_vars, "")

# Now append them at the end of the file wrapped in `html[data-color-theme="..."] *`
new_blocks = f"""

html[data-color-theme="light"] * {{
{light_vars}
}}

html[data-color-theme="dark"] * {{
{dark_vars}
}}
"""

with open("frontend/src/app/globals.css", "w") as f:
    f.write(css + new_blocks)

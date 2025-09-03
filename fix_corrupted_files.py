#!/usr/bin/env python3
import os
import sys

def fix_corrupted_file(file_path):
    """Fix files with literal \n characters by replacing them with actual newlines"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace literal \n with actual newlines
        fixed_content = content.replace('\\n', '\n')
        
        # Write back the fixed content
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(fixed_content)
        
        print(f"✓ Fixed: {file_path}")
        return True
    except Exception as e:
        print(f"✗ Error fixing {file_path}: {e}")
        return False

# List of files to fix
files_to_fix = [
    "/Users/jumaanebey/Downloads/kickoff-club-v2/public/sw.js",
    "/Users/jumaanebey/Downloads/kickoff-club-v2/src/algorithms/spacedRepetition.js",
    "/Users/jumaanebey/Downloads/kickoff-club-v2/src/utils/advancedCaching.js",
    "/Users/jumaanebey/Downloads/kickoff-club-v2/src/utils/advancedAnalytics.js",
    "/Users/jumaanebey/Downloads/kickoff-club-v2/src/components/InteractiveLessonElements.jsx",
    "/Users/jumaanebey/Downloads/kickoff-club-v2/src/components/SocialShare.jsx"
]

print("Fixing corrupted files with literal \\n characters...")
print("-" * 50)

success_count = 0
for file_path in files_to_fix:
    if os.path.exists(file_path):
        if fix_corrupted_file(file_path):
            success_count += 1
    else:
        print(f"✗ File not found: {file_path}")

print("-" * 50)
print(f"Fixed {success_count}/{len(files_to_fix)} files successfully!")
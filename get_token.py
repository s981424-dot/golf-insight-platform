import json

def read_file(path):
    for encoding in ['utf-16', 'utf-8', 'cp949']:
        try:
            with open(path, 'r', encoding=encoding) as f:
                return f.read()
        except:
            continue
    return None

content = read_file('paypal_token.json')
if content:
    try:
        data = json.loads(content)
        print(data.get('access_token'))
    except Exception as e:
        print(f"JSON Error: {e}")
else:
    print("Could not read file")

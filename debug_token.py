import json
with open('paypal_token.json', 'r', encoding='utf-16') as f:
    data = json.load(f)
    with open('token_debug.txt', 'w', encoding='utf-8') as f2:
        f2.write(data['access_token'])

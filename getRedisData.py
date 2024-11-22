import redis
import os
from dotenv import load_dotenv

load_dotenv()

redis_password = os.getenv('REDIS_PASSWORD')

r = redis.StrictRedis(host='localhost', port=6379, password=redis_password)

user_keys = r.keys('user:*')

for key in user_keys:
    user_data = r.hgetall(key)
    print(f"User ID: {key}, Name: {user_data['name']}, Email: {user_data['email']}")
    for field, value in user_data.items():
        print(f"Field: {field.decode()}, Value: {value.decode()}")

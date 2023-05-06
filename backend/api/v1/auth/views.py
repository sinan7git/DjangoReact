
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import  AllowAny
import requests
import json
from django.contrib.auth.models import User


@api_view(["POST"])
@permission_classes([AllowAny])
def create(request):
    email = request.data['email']
    password = request.data['password']
    name = request.data['name']
    if not User.objects.filter(username=email).exists():
        user = User.objects.create_user(
            username=email,
            password=password,
            first_name=name
        )
        headers = {"Content-type": "application/json"}
        data = {"username": email, "password": password}
        protocol = "https://" if request.is_secure() else "http://"
        url = protocol + request.get_host() + "/api/v1/auth/token/"
        response = requests.post(url, headers=headers, data=json.dumps(data))
        response_data = {
            "status_code": 6000,
            "data": response.json() if response.status_code == 200 else "an error occurred",
            "message": "Account created" if response.status_code == 200 else "",
        }
    else:
        response_data = {
            "status_code": 6001,
            "data": "This account already exists",
        }
    return Response(response_data)

from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
import json
import logging
logger = logging.getLogger(__name__)



class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        logger.info(f"Received data: {data}")

        if not username or not password:
            return JsonResponse({'error': '사용자명과 비밀번호를 모두 입력해주세요.'}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': '이미 존재하는 사용자명입니다.'}, status=400)

        try:
            user = User.objects.create_user(username=username, password=password)
            return JsonResponse({'success': '회원가입이 완료되었습니다.'}, status=201)
        except ValueError as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': '잘못된 요청입니다.'}, status=400)

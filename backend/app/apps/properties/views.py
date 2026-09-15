from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Property
from .serializers import PropertySerializer


class PropertyListView(APIView):
    def get(self, request):
        return Response(PropertySerializer(Property.objects.all(), many=True).data)

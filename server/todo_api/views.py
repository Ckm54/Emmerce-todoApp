from rest_framework.response import Response
from rest_framework import status, generics
from todo_api.models import TodoModel
from todo_api.serializers import TodoSerializer
import math
from datetime import datetime

# Create your views here.
class Todos(generics.GenericAPIView):
  serializer_class = TodoSerializer
  queryset = TodoModel.objects.all()

  def get(self, request):
    page_num = int(request.GET.get("page", 1))
    limit_num = int(request.GET.get("limit", 10))
    start_num = (page_num - 1) * limit_num
    end_num = limit_num * page_num
    search_param = request.GET.get("search")
    todos = TodoModel.objects.all()
    total_todos = todos.count()
    if (search_param):
      todos = todos.filter(title__icontains=search_param)
    serializer = self.serializer_class(todos[start_num:end_num], many=True)
    return Response({
      "status": "Success",
      "total": total_todos,
      "page": page_num,
      "last_page": math.ceil(total_todos / limit_num),
      "todos": serializer.data
    })
    
  def post(self, request):
    serializer = self.serializer_class(data=request.data)
    if (serializer.is_valid()):
      serializer.save()
      return Response({
        "status": "success",
        "todo": serializer.data,
      }, status=status.HTTP_201_CREATED)
    else:
      return Response({"status": "failed", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
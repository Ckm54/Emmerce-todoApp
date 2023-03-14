from rest_framework.response import Response
from rest_framework import status, generics
from todoApp.models import TodoModel
from todoApp.serializers import TodoSerializer
import math
from datetime import datetime
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class Todos(generics.GenericAPIView):
  permission_classes = (IsAuthenticated,)
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

class TodoDetail(generics.GenericAPIView):
  permission_classes = (IsAuthenticated,)
  querySet = TodoModel.objects.all()
  serializer_class = TodoSerializer

  def get_todo(self, pk):
    try:
      return TodoModel.objects.get(pk=pk)
    except:
      return None

  def get(self, request, pk):
    todo = self.get_todo(pk=pk)
    if (todo == None):
      return Response({
        "status": "fail",
        "message": f"Todo item with id: {pk} not found",
      }, status = status.HTTP_404_NOT_FOUND)
    
    serializer = self.serializer_class(todo)
    return Response({
      "status": "success",
      "todo": serializer.data
    })

  def patch(self, request, pk):
    todo = self.get_todo(pk)
    if todo == None:
      return Response({
        "status": "failed",
        "message": f"Todo item with id {pk} not found"
      }, status=status.HTTP_404_NOT_FOUND)
    serializer = self.serializer_class(
      todo, data=request.data, partial=True
    )

    if serializer.is_valid():
      serializer.validated_data['updatedAt'] = datetime.now()
      serializer.save()
      return Response({
        "status": "success",
        "todo": serializer.data
      })
    return Response({
      "status": "fail",
      "message": serializer.errors,
    }, status=status.HTTP_400_BAD_REQUEST)
  def delete(self, request, pk):
    todo = self.get_todo(pk)
    if todo == None:
      return Response({
        "status": "fail",
        "message": f"Note with id {pk} not found"
      }, status=status.HTTP_404_NOT_FOUND)
    todo.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
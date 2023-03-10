from django.urls import path
from todo_api.views import Todos, TodoDetail

urlpatterns = [
    path('', Todos.as_view()),
    path('<str:pk>', TodoDetail.as_view())
]

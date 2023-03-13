from django.urls import path
from todoApp.views import Todos, TodoDetail

urlpatterns = [
    path('', Todos.as_view()),
    path('<str:pk>', TodoDetail.as_view())
]

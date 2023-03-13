from rest_framework import serializers
from todoApp.models import TodoModel

class TodoSerializer(serializers.ModelSerializer):
  class Meta:
    model = TodoModel
    fields = '__all__'

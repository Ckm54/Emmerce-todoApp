import uuid
from django.db import models

# Create your models here.

class TodoModel(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  title= models.CharField(max_length=50)
  description = models.TextField()
  isComplete = models.BooleanField(default=False)
  createdAt = models.DateTimeField(auto_now_add=True)
  updatedAt = models.DateTimeField(auto_now_add=True)

  class Meta:
    db_table = "todos"
    ordering = ['-createdAt']

    def __str__(self) -> str:
        return self.title
    

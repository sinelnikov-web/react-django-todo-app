from django.db import models

# Create your models here.


class Todo(models.Model):
    user_ip = models.CharField(max_length=16)


class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    completed = models.BooleanField(default=False)
    todo = models.ForeignKey(Todo, on_delete=models.CASCADE, related_name='tasks')
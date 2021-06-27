from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
# Create your views here.
from todo.models import Todo, Task
from todo.serializers import TodoSerializer, TaskSerializer
from utils.utils import get_client_ip


class TodoView(APIView):

    def get(self, request):
        ip = get_client_ip(request)
        todo, status = Todo.objects.get_or_create(user_ip=ip)
        serializer = TodoSerializer(todo)
        return Response(serializer.data)

    def post(self, request):
        pass


class TaskView(APIView):

    def get(self, request):
        ip = get_client_ip(request)
        todo, status = Todo.objects.get_or_create(user_ip=ip)
        serializer = TaskSerializer(todo.tasks.all(), many=True)
        return Response(serializer.data)

    def post(self, request):
        ip = get_client_ip(request)
        todo, status = Todo.objects.get_or_create(user_ip=ip)
        title, description = [request.POST.get('title'), request.POST.get('description')]
        Task.objects.create(title=title, description=description, todo=todo)
        serializer = TaskSerializer(todo.tasks.all(), many=True)
        return Response(serializer.data)

    def put(self, request, task_id):
        ip = get_client_ip(request)
        title, description, completed = [
            request.POST.get('title'),
            request.POST.get('description'),
            request.POST.get('completed')
        ]
        task = Task.objects.get(id=task_id)
        task.title = title
        task.description = description
        task.completed = True if completed == 'true' else False
        task.save()
        todo = Todo.objects.get(user_ip=ip)
        serializer = TaskSerializer(todo.tasks.all(), many=True)
        return Response(serializer.data)

    def delete(self, request, task_id):
        ip = get_client_ip(request)
        task = Task.objects.get(id=task_id)
        task.delete()
        todo = Todo.objects.get(user_ip=ip)
        serializer = TaskSerializer(todo.tasks.all(), many=True)
        return Response(serializer.data)
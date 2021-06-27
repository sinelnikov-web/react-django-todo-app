from rest_framework.serializers import ModelSerializer

from todo.models import Todo, Task


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class TodoSerializer(ModelSerializer):

    tasks = TaskSerializer(many=True)

    class Meta:
        model = Todo
        fields = '__all__'

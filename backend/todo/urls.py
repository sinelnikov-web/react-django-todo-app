from django.urls import path
from . import views

urlpatterns = [
    path('todo/tasks/<int:task_id>', views.TaskView.as_view()),
    path('todo/tasks/', views.TaskView.as_view()),
    path('todo/', views.TodoView.as_view()),
]
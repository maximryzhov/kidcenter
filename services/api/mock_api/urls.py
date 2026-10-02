from django.urls import path

from . import views

urlpatterns = [
    path("login/", views.login),
    path("teacher/students/", views.teacher_students),
    path("teacher/lessons/", views.teacher_lessons),
    path("student/lessons/", views.student_lessons),
    path("teacher/profile/", views.teacher_profile),
    path("student/profile/", views.student_profile),
    path("notifications/", views.notifications),
]

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .mock_data import LESSONS, NOTIFICATIONS, STUDENTS, TEACHER


@api_view(["POST"])
def login(request):
    role = request.data.get("role", "teacher")
    user = TEACHER if role == "teacher" else STUDENTS[0]
    return Response({"role": role, "user": user})


@api_view(["GET"])
def teacher_students(request):
    return Response(STUDENTS)


@api_view(["GET"])
def teacher_lessons(request):
    return Response(LESSONS)


@api_view(["GET"])
def student_lessons(request):
    return Response([lesson for lesson in LESSONS if "student-1" in lesson["students"]])


@api_view(["GET"])
def teacher_profile(request):
    return Response(TEACHER)


@api_view(["GET"])
def student_profile(request):
    return Response(STUDENTS[0])


@api_view(["GET"])
def notifications(request):
    return Response(NOTIFICATIONS)

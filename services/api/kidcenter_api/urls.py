from django.urls import include, path

urlpatterns = [path("api/", include("mock_api.urls"))]

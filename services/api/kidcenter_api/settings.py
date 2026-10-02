from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = "mockup-only-not-for-production"
DEBUG = True
ALLOWED_HOSTS = ["*"]
ROOT_URLCONF = "kidcenter_api.urls"
INSTALLED_APPS = ["rest_framework"]
MIDDLEWARE = ["django.middleware.common.CommonMiddleware"]
DATABASES = {}
LANGUAGE_CODE = "ru-ru"
TIME_ZONE = "Europe/Moscow"
USE_I18N = True
USE_TZ = True
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [],
    "DEFAULT_PERMISSION_CLASSES": [],
    "UNAUTHENTICATED_USER": None,
}

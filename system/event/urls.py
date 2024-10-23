from django.urls import path
from . import views

urlpatterns = [
    path('competitions/', views.competitions, name="competitions"),
    path('team/', views.team, name="team")
]
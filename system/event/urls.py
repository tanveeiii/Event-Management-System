from django.urls import path
from . import views

urlpatterns = [
    path('competitions/', views.competitions, name="competitions"),
    path('team/', views.team, name="team"),
    path('event/', views.event, name="event" ),
    path('participants/', views.participants, name="participants"),
    path('speaker/', views.speakers, name='speaker'),
    path('attendees/', views.attendees, name="attendees"),
    path('sponsors/', views.sponsors, name="sponsors"),
]
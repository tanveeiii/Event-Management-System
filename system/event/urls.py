from django.urls import path
from . import views

urlpatterns = [
    path('api/competitions/', views.competitions, name="competitions"),
    path('api/team/', views.team, name="team"),
    path('api/event/', views.event, name="event" ),
    path('api/participants/', views.participants, name="participants"),
    path('api/speaker/', views.speakers, name='speaker'),
    path('api/attendees/', views.attendees, name="attendees"),
    path('api/sponsors/', views.sponsors, name="sponsors"),
    path('api/login/', views.login, name="login"),
    path('api/gallery/', views.gallery, name="gallery"),
    path('api/create_order/', views.create_order, name="create_order"),
]
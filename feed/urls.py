from django.urls import path
from .views import *

urlpatterns = [
    path('', postListView, name='home'),
    path('post/<int:pk>/delete', PostDeleteView.as_view(), name='postdelete'),
    path('<str:username>/show_profile/', show_profile, name='show_profile'),

    path('like', LikeView, name='like_post'),
    path('show_profile/like', LikeView, name='like2'),
    path('profile/like', LikeView, name='from_profile_like_post'),

    path('checkifliked/', checkifLiked, name='checkifliked'),

    path('show_profile/follow/', follow, name='follow2'),
    path('show_profile/checkfollow/', follow2, name='follow2'),

    path('profile/followlist/', followList, name='followList'),

    path('save/', SaveView, name='save'),
    path('checkifsaved/', SaveView2, name='save2'),

    path('suggestions/', suggestions, name='suggestions'),

    path('reportaproblem/', reportaproblem, name='reportaproblem'),
    path('problemsreported/', problemsreported, name='problemsreported'),

    path('photos/', photos, name='photos'),

]
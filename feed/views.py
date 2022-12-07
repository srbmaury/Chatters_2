from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, get_object_or_404
from django.contrib import messages
from django.views.generic import DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.shortcuts import render, redirect
from accounts.models import *
from .forms import *
from .models import *

import random
from django import template

register = template.Library()
# Create your views here.

@login_required
@csrf_exempt
def postListView(request):
    posts = post.objects.all()
    posts = list(posts)
    user = User.objects.get(username = request.user.username)
    
    user_ids = UserFollowing.objects.values_list('user_id', flat=True)
    followers = UserFollowing.objects.values_list('followers', flat=True)

    user_ids = list(user_ids)
    followers = list(followers)

    postlist = []
    for curr_post in posts:
        curr_user = User.objects.get(username = curr_post.uname)
        if (curr_user.id, user.id) in zip(user_ids, followers):
            postlist.append(curr_post)
        if (curr_user == user):
            postlist.append(curr_post)
    postlist.reverse()


    pcform = postCreateForm(request.POST, request.FILES)  
    if request.method == 'POST':
        if pcform.is_valid():
            newform = pcform.save(commit=False)
            newform.uname_id = request.user.id
            newform.save()
            return redirect('home')
    else:
        pcform = postCreateForm()

    context = {
        "object_list": postlist,
        "pcform" : pcform
    }
    return render(request, 'feed/home.html', context)

@csrf_exempt
def suggestions(request):
    users = User.objects.all()
    users = list(users)
    user = User.objects.get(username = request.user.username)
    
    user_ids = UserFollowing.objects.values_list('user_id', flat=True)
    followers = UserFollowing.objects.values_list('followers', flat=True)

    user_ids = list(user_ids)
    followers = list(followers)

    userlist = []
    for curr_user in users:
        if (curr_user.id, user.id) not in zip(user_ids, followers):
            if(curr_user.id == user.id):
                continue
            x = curr_user.first_name + ' ' + curr_user.last_name
            userlist.append([x,curr_user,curr_user.profile.image.url, curr_user.id])

    context = {
        "object_list": userlist,
    }
    return HttpResponse(userlist)


class PostDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = post
    success_url = '/profile'

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.uname:
            return True
        return False
     
def show_profile(request, username):
    user = User.objects.get(username = username)
    posts_list = []
    for posts in post.objects.all():
        if posts.uname == user:
            posts_list.append(posts)
    x = random.randint(0, 100)
    if x < 10:
        Notifications.objects.create(username=user,other_user=request.user, notification='viewed your profile.')
    posts_list.sort(key=lambda x: x.datetime, reverse=True)

    context = {
        'curruser': user,
        'posts_list': posts_list,
    }
    return render(request, 'accounts/show_profile.html', context)

@csrf_exempt
def LikeView(request):
    x = []
    if("id" in request.POST):
        curr_post = get_object_or_404(post, id=request.POST.get('id'))
        curr_user = curr_post.uname
        if request.user not in curr_post.likes.all():
            curr_post.likes.add(request.user)
            if(curr_user != request.user):
                Notifications.objects.create(username=curr_user,other_user=request.user, notification='liked your post.', post=curr_post)
        else:
            curr_post.likes.remove(request.user)
        x = list(curr_post.likes.all())
    return HttpResponse(len(x))

@csrf_exempt
def SaveView(request):
    x = []
    if("id" in request.POST):
        curr_post = get_object_or_404(post, id=request.POST.get('id'))
        if request.user not in curr_post.saved.all():
            if(curr_post.uname != request.user):
                Notifications.objects.create(username=curr_post.uname,other_user=request.user, notification='saved your post.', post=curr_post)
            curr_post.saved.add(request.user)
        else:
            curr_post.saved.remove(request.user)
        x = list(curr_post.saved.all())
    return HttpResponse(len(x))

@csrf_exempt
def SaveView2(request):
    x = []
    check = False
    if("id" in request.POST):
        curr_post = get_object_or_404(post, id=request.POST.get('id'))
        if request.user in curr_post.saved.all():
            check = True
    return HttpResponse(check)

@csrf_exempt
def checkifLiked(request):
    check = False
    if("id" in request.POST):
        curr_post = get_object_or_404(post, id=request.POST.get('id'))
        if request.user in curr_post.likes.all():
            check = True
    return HttpResponse(check)

@csrf_exempt
def checkifLiked2(request):
    check = False
    if("id" in request.POST):
        curr_post = get_object_or_404(post, id=request.POST.get('id'))
        if request.user in curr_post.likes.all():
            check = True
    return HttpResponse(check)

@csrf_exempt
def follow(request):
    if("id" in request.POST):
        user_id = int(request.POST['id'])
        user = User.objects.get(id=user_id)

        user_ids = UserFollowing.objects.values_list('user_id', flat=True)
        followers = UserFollowing.objects.values_list('followers', flat=True)

        user_ids = list(user_ids)
        followers = list(followers)

        follower = 0
        following = 0
        if (request.user.id, user.id) not in zip(followers, user_ids):
            UserFollowing.objects.create(user_id=user, followers=request.user)
            Notifications.objects.create(username=user,other_user=request.user, notification='started following you.')
        else:
            record = UserFollowing.objects.get(user_id=user, followers=request.user)
            record.delete()
            Notifications.objects.create(username=user,other_user=request.user, notification='unfollowed you.')

        user_ids = UserFollowing.objects.values_list('user_id', flat=True)
        followers = UserFollowing.objects.values_list('followers', flat=True)

        user_ids = list(user_ids)
        followers = list(followers)

        for (x,y) in zip(user_ids, followers):
            if x == request.user.id:
                follower += 1
            if y == request.user.id:
                following += 1
    return HttpResponse([follower, following])

@csrf_exempt
def follow2(request):
    if("id" in request.POST):
        user_id = int(request.POST['id'])
        user = User.objects.get(id=user_id)

        user_ids = UserFollowing.objects.values_list('user_id', flat=True)
        followers = UserFollowing.objects.values_list('followers', flat=True)

        user_ids = list(user_ids)
        followers = list(followers)

        check = False
        if (request.user.id, user.id) in zip(followers, user_ids):
            check = True
    return HttpResponse(check)

@csrf_exempt
def followList(request):
    if("id" in request.POST):
        user_id = int(request.POST['id'])
        user = User.objects.get(id=user_id)

        user_ids = UserFollowing.objects.values_list('user_id', flat=True)
        followers = UserFollowing.objects.values_list('followers', flat=True)

        user_ids = list(user_ids)
        followers = list(followers)

        follower = 0 
        following = 0
        for (x,y) in zip(user_ids, followers):
            if(x == user.id):
                follower+=1
            if y == user.id:
                following+=1
    return HttpResponse([follower, following])

@csrf_exempt
def reportaproblem(request):
    rform = ProblemForm(request.POST, request.FILES)

    if request.method == 'POST':
        if rform.is_valid():
            newform = rform.save(commit=False)
            newform.uname = request.user
            newform.save()
            messages.success(request, 'Your response has been recorded.')
            return redirect('/reportaproblem')
    else:
        rform = ProblemForm()
    return render(request, 'accounts/reportaproblem.html', {'rform' : rform})


def problemsreported(request):
    problem = Problem.objects.all()
    if request.user.is_superuser:
        return render(request, 'accounts/show_problems.html',{'problems':problem})


def photos(request):
    posts = post.objects.all()
    l = []
    ct = 0
    for p in posts:
        if p.uname == request.user:
            l.append(p)
            ct+=1
    l.reverse()
    return render(request, 'accounts/photos.html', {'posts':l})
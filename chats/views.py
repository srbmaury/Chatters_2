from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from .forms import *
from .models import Chat
# Create your views here.
def chat(request, username):
    sender = request.user
    receiver = User.objects.get(username = username)
    chats = Chat.objects.all()
    chats = list(chats)

    chat_list = []
    for chat in chats:
        if chat.sender == request.user:
            chat_list.append(chat)
        elif chat.receiver == request.user:
            chat_list.append(chat)
    
    form = NewMessageForm(request.POST)
    context = {
        'other_user':receiver,
        'form': form,
        'chat_list':chat_list,
    }
    if request.method == 'POST':
        msg = request.POST.get('text')
        if form.is_valid():
            Chat.objects.create(sender=sender, receiver=receiver, text = msg)
            return  redirect (f'/chatview/{username}', context)
    else:
        form = NewMessageForm({'sender' : sender, 'receiver' : receiver})
    return render(request, 'chats/chatbox.html', context)
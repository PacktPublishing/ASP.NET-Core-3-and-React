using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace QandA.Hubs
{
    public class QuestionsHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
            await Clients.Caller.SendAsync("Message", "Successfully connected");
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.Caller.SendAsync("Message", "Successfully disconnected");
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SubscribeQuestion(int questionId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"Question-{questionId}");
            await Clients.Caller.SendAsync("Message", "Successfully subscribed");
        }

        public async Task UnsubscribeQuestion(int questionId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"Question-{questionId}");
            await Clients.Caller.SendAsync("Message", "Successfully unsubscribed");
        }
    }
}
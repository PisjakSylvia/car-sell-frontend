import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-message',
  imports: [HttpClientModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  sender: string = '';
  message: string = '';
  messages: { sender: string, content: string }[] = [];

  constructor(private http: HttpClient) {}

  sendMessage(): void {
    if (this.sender && this.message) {
      const newMessage = {
        sender: this.sender,
        content: this.message
      };

      // Save to server (fake URL, replace with actual backend endpoint)
      this.http.post('http://localhost:3000/api/messages', newMessage).subscribe(
        (response) => {
          this.messages.push(newMessage); // Add to local array
          this.message = ''; // Clear message input
        },
        (error) => {
          console.error('Error sending message:', error);
        }
      );
    }
  }

  loadMessages(): void {
    // Fetch messages from server (fake URL, replace with actual backend endpoint)
    this.http.get<{ sender: string, content: string }[]>('http://localhost:3000/api/messages').subscribe(
      (response) => {
        this.messages = response;
      },
      (error) => {
        console.error('Error loading messages:', error);
      }
    );
  }

  ngOnInit(): void {
    this.loadMessages(); // Load messages on component initialization
  }
}
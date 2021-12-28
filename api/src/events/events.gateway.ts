import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/events' })
export class EventsGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;
  private logger = new Logger(EventsGateway.name);
  private room = '';

  afterInit(server: any) {
    this.logger.log('Initialized!', server);
  }

  @SubscribeMessage('events')
  handleMessage(
    client: Socket,
    message: { sender: string; room: string; message: string[] },
  ) {
    this.server.to(this.room).emit('completeMessageClient', message);
  }

  @SubscribeMessage('joinRoom')
  async handleRoomJoin(client: Socket, room: string) {
    client.join(room);
    this.room = room;
    this.logger.log(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }
}

let roomId
let userName
let userCode
let stompClient

// 버튼 클릭 이벤트
// 방 입장 버튼
document.querySelector("#enterRoomBtn").addEventListener('click', async () => {
    roomId = document.querySelector("#roomNumber").value;
    userName = document.querySelector("#userName").value;
    userCode = btoa(userName);

    await connect();
});

// 메시지 전송 버튼
document.querySelector("#sendMessageBtn").addEventListener('click', async () => {
    await sendMessage();
});

// 소켓 연결
// 채팅방 구독
const connect = async () => {
    let socket = new SockJS('/chatting');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function () {
        console.log("start connecting chatting room...");

        stompClient.subscribe(`/topic/message/send/${roomId}`, data => {
            const sender = atob(JSON.parse(data.body).sender);
            const message = JSON.parse(data.body).msg;

            showMessage(sender, message);
        });
    });
}

// 메시지 전송
const sendMessage = async () => {
    const message = document.querySelector("#message").value;

    stompClient.send(`/app/message/send/${roomId}`, {}, JSON.stringify({
        sender: userCode,
        msg: message
    }));
}

// 받은 메시지 화면에 표시
function showMessage(sender, message) {
    let curText = document.querySelector("#chattingRoomTextarea").value;
    curText += sender + " : " + message + "\n";
    console.log(curText);
    document.getElementById("chattingRoomTextarea").value = curText;
}
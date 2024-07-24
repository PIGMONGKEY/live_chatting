let roomId
let userName
let userCode
let stompClient

// 버튼 클릭 이벤트
// 방 입장 버튼
document.querySelector("#enterRoomBtn").addEventListener('click', async () => {
    roomId = document.querySelector("#roomNumber").value;
    userName = document.querySelector("#userName").value;
    userCode = encodeURIComponent(userName);

    await connect().then(() => {
        document.getElementById("roomNumber").disabled = true;
        document.getElementById("userName").disabled = true;
        document.getElementById("enterRoomBtn").disabled = true;
        document.getElementById("messageDiv").style.visibility = "visible";
        document.getElementById("chattingRoomDiv").style.visibility = "visible";
    });
});

// 메시지 전송 버튼
document.querySelector("#sendMessageBtn").addEventListener('click', async () => {
    await sendMessage();
    document.getElementById("message").value = "";
});

// 소켓 연결
// 채팅방 구독
const connect = async () => {
    let socket = new SockJS('/chatting');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function () {
        console.log("start connecting chatting room...");

        stompClient.subscribe(`/topic/message/send/${roomId}`, data => {
            const sender = decodeURIComponent(JSON.parse(data.body).sender);
            const message = JSON.parse(data.body).msg;

            showMessage(sender, message);
        });
    });

    console.log("success to connect chatting room " + roomId);
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
    const textarea = document.getElementById("chattingRoomTextarea");
    textarea.scrollTop = textarea.scrollHeight;
}
/* The PeerService class in JavaScript manages peer-to-peer connections for audio and video calls,
including initializing the peer, answering and making calls, toggling audio and video streams, and
sharing the screen. */
import Peer from "peerjs";

class PeerService {
  constructor() {
    this.peer = null;
    this.localStream = null;
    this.remoteStream = null;
    this.call = null;
  }

  async initializePeer() {
    this.peer = new Peer(undefined, {
      host: "/",
      port: 5000,
      path: "/peerjs",
    });

    try {
      return await new Promise((resolve, reject) => {
        this.peer.on("open", resolve);
        this.peer.on("error", reject);
      });
    } catch (err) {
      throw new Error(`Failed to initialize peer: ${err.message}`);
    }
  }

  async answerCall(stream) {
    this.localStream = stream;

    this.peer.on("call", (incomingCall) => {
      incomingCall.answer(stream);
      incomingCall.on("stream", (remoteStream) => {
        this.remoteStream = remoteStream;
      });
      this.call = incomingCall;
    });
  }

  async makeCall(remotePeerId, stream) {
    this.localStream = stream;

    const outgoingCall = this.peer.call(remotePeerId, stream);

    outgoingCall.on("stream", (remoteStream) => {
      this.remoteStream = remoteStream;
    });

    this.call = outgoingCall;
  }

  toggleAudio() {
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
    }
  }

  toggleVideo() {
    if (this.localStream) {
      const videoTrack = this.localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
    }
  }

  track() {
    console.log("This is not a right track");
  }
  async shareScreen() {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      const screenTrack = screenStream.getVideoTracks()[0];
      const sender = this.call.peerConnection
        .getSenders()
        .find((s) => s.track.kind === "video");
      sender.replaceTrack(screenTrack);

      screenTrack.onended = () => {
        sender.replaceTrack(this.localStream.getVideoTracks()[0]);
      };
    } catch (err) {
      throw new Error(`Failed to share screen: ${err.message}`);
    }
  }
}

export default new PeerService();

import { useRef, useEffect } from "react";
import { usePeer } from "../context/peer-context";

export const VideoCall = () => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const {
    remotePeerId,
    setRemotePeerId,
    callPeer,
    toggleAudio,
    toggleVideo,
    shareScreen,
    audioEnabled,
    videoEnabled,
    remoteStream,
  } = usePeer();

  useEffect(() => {
    const locatStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        throw new Error(error);
      }
    };

    locatStream();
  }, []);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div>
      <h1>Video Call App</h1>
      <div>
        <video ref={localVideoRef} autoPlay muted />
        <video ref={remoteVideoRef} autoPlay muted />
      </div>
      <div>
        <input
          type="text"
          value={remotePeerId}
          onChange={(e) => setRemotePeerId(e.target.value)}
          placeholder="Remote Peer ID"
        />
        <button onClick={callPeer}>Call</button>
      </div>
      <div>
        <button onClick={toggleAudio}>
          {audioEnabled ? "Mute" : "Unmute"} Audio
        </button>
        <button onClick={toggleVideo}>
          {videoEnabled ? "Disable" : "Enable"} Video
        </button>
        <button onClick={shareScreen}>Share Screen</button>
      </div>
    </div>
  );
};

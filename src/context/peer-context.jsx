/* This code snippet is creating a React context for managing peer-to-peer communication in a web
application. Here's a breakdown of what each part of the code is doing: */
import  { createContext, useContext, useState, useEffect } from "react";
import peerService from "../services/peer-service";

const PeerContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const usePeer = () => useContext(PeerContext);

// eslint-disable-next-line react/prop-types
export const PeerProvider = ({ children }) => {
  const [peerId, setPeerId] = useState("");
  const [remotePeerId, setRemotePeerId] = useState("");
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [remoteStream, setRemoteStream] = useState(null);


  useEffect(() => {
    const initializePeer = async () => {
      try {
        const id = await peerService.initializePeer();
        setPeerId(id);
      } catch (error) {
        console.error("Failed to initialize peer", error);
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        await peerService.answerCall(stream);
      } catch (error) {
        console.error("Failed to get local stream", error);
      }

      peerService.peer.on("call", (incomingCall) => {
        incomingCall.on ("stream", (stream) => {
          setRemoteStream(stream);
        });
      });
    };
    initializePeer();
  }, []);

  const callPeer = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      await peerService.makeCall(remotePeerId, stream);
      peerService.call.on("stream", (stream) => {
        setRemoteStream(stream);
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const toggleAudio = () => {
    peerService.toggleAudio();
    setAudioEnabled(!audioEnabled);
  };

  const toggleVideo = () => {
    peerService.toggleVideo();
    setVideoEnabled(!videoEnabled);
  };

  const shareScreen = async () => {
    try {
      await peerService.shareScreen();
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <PeerContext.Provider
      value={{
        peerId,
        remotePeerId,
        setRemotePeerId,
        callPeer,
        toggleAudio,
        toggleVideo,
        shareScreen,
        audioEnabled,
        videoEnabled,
        remoteStream,
      }}
    >
      {children}
    </PeerContext.Provider>
  );
};

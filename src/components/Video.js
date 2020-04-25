import React, { useEffect, useRef } from "react";
import TwilioVideo from "twilio-video";

const Video = ({ token }) => {
  const localVidRef = useRef();
  const remoteVidRef = useRef();

  useEffect(() => {
    TwilioVideo.connect(token, { video: true, audio: true, name: "test" }).then(
      room => {
        //attach local video track
        TwilioVideo.createLocalVideoTrack().then(track => {
          localVidRef.current.appendChild(track.attach());
        });

        //helper to add new remote participants
        const addNewParticipant = participant => {
          console.log('new participant joined',participant.identity);
          participant.tracks.forEach(publication => {
            if (publication.isSubscribed) {
              const track = publication.track;

              remoteVidRef.current.appendChild(track.attach());
              console.log('added remote video');
            }
          });

          participant.on("trackSubscribed", track => {
            console.log("track subscribed and remote video added");
            remoteVidRef.current.appendChild(track.attach());
          });
        };
        //for each participant, apply helper to add video
        room.participants.forEach(addNewParticipant);
        room.on("participantConnected", addNewParticipant);
      }
    );
  }, [token]);

  return (
    <div>
      <div ref={localVidRef} />
      <div ref={remoteVidRef} />
    </div>
  );
};

export default Video;

    let stream;
    let cameraEnabled = true;
    let micEnabled = true;

    async function toggleCamera() {
      if (stream) {
        const videoTrack = stream.getVideoTracks()[0];
        videoTrack.enabled = !videoTrack.enabled;
        cameraEnabled = !cameraEnabled;
    
        const cameraOnIcon = document.getElementById('camera-on-icon');
        const cameraOffIcon = document.getElementById('camera-off-icon');
    
        if (cameraEnabled) {
          cameraOnIcon.style.display = 'block';
          cameraOffIcon.style.display = 'none';
        } else {
          cameraOnIcon.style.display = 'none';
          cameraOffIcon.style.display = 'block';
        }
    
        const cameraStatusElement = document.getElementById('camera-status');
        cameraStatusElement.classList.remove(cameraEnabled ? 'camera-off' : 'camera-on');
        cameraStatusElement.classList.add(cameraEnabled ? 'camera-on' : 'camera-off');
      }
    }
    

    async function toggleMic() {
      if (stream) {
        const audioTrack = stream.getAudioTracks()[0];
        audioTrack.enabled = !audioTrack.enabled;
        micEnabled = !micEnabled;
    
        const micOnIcon = document.getElementById('mic-on-icon');
        const micOffIcon = document.getElementById('mic-off-icon');
    
        if (micEnabled) {
          micOnIcon.style.display = 'block';
          micOffIcon.style.display = 'none';
        } else {
          micOnIcon.style.display = 'none';
          micOffIcon.style.display = 'block';
        }
    
        const micStatusElement = document.getElementById('mic-status');
        micStatusElement.classList.remove(micEnabled ? 'mic-off' : 'mic-on');
        micStatusElement.classList.add(micEnabled ? 'mic-on' : 'mic-off');
      }
    }


    async function leaveMeeting() {
      stopCamera();
      window.location.href = 'thankyou.html'; // Redirect to the thank you page
    }

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const videoElement = document.getElementById('local-video');
        videoElement.srcObject = stream;
        document.getElementById('toggle-camera-button').removeAttribute('disabled');
        document.getElementById('toggle-mic-button').removeAttribute('disabled');
      } catch (err) {
        console.error('Error accessing the camera and/or microphone:', err);
      }
    }

    function stopCamera() {
      if (stream) {
        const videoElement = document.getElementById('local-video');
        videoElement.srcObject = null;
        stream.getTracks().forEach(track => track.stop());
      }
    }

    document.getElementById('toggle-camera-button').addEventListener('click', toggleCamera);
    document.getElementById('toggle-mic-button').addEventListener('click', toggleMic);
    document.getElementById('leave-button').addEventListener('click', leaveMeeting);

    // Start the camera when the page loads
    window.addEventListener('load', startCamera);
    

document.addEventListener('DOMContentLoaded', () => {
    
    const downloadDiagramBtn = document.getElementById('downloadDiagramBtn');
    if (downloadDiagramBtn) {
        downloadDiagramBtn.addEventListener('click', async () => {
            try {
                
                await new Promise(resolve => setTimeout(resolve, 100));

                const canvas = await new Promise(resolve => {
                    const scale = window.devicePixelRatio;
                    const video = document.createElement("video");

                    navigator.mediaDevices.getDisplayMedia({
                        preferCurrentTab: true,
                        video: {
                            displaySurface: "browser",
                            width: { ideal: window.innerWidth * scale },
                            height: { ideal: window.innerHeight * scale }
                        }
                    }).then(stream => {
                        video.srcObject = stream;
                        video.onloadedmetadata = () => {
                            video.play();
                            const canvas = document.createElement("canvas");
                            canvas.width = video.videoWidth;
                            canvas.height = video.videoHeight;
                            canvas.getContext("2d").drawImage(video, 0, 0);
                            stream.getTracks().forEach(track => track.stop());
                            resolve(canvas);
                        };
                    });
                });

                canvas.toBlob(blob => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "diagram.png";
                    a.click();
                    URL.revokeObjectURL(url);
                }, "image/png");

            } catch (error) {
                console.error("Error capturing screenshot:", error);
                alert("Failed to capture screenshot. Please ensure you've granted screen capture permissions.");
            }
        });
    }
})
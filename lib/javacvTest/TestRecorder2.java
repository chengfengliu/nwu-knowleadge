package javacvTest;

import static org.bytedeco.javacpp.opencv_imgcodecs.cvLoadImage;

import java.io.File;
 
import org.bytedeco.javacpp.avcodec;
import org.bytedeco.javacpp.opencv_core;
import org.bytedeco.javacpp.opencv_core.IplImage;
import org.bytedeco.javacv.FFmpegFrameRecorder;
import org.bytedeco.javacv.OpenCVFrameConverter;
public class TestRecorder2 { 
	public static void test(String saveMp4name,String imagesPath) throws Exception  {
		System.out.println("start");
		System.out.println(imagesPath);
		System.out.println(saveMp4name);
		System.out.println("test...0");
		FFmpegFrameRecorder recorder = new FFmpegFrameRecorder(saveMp4name, 640, 480);
		System.out.println("test...1");
		recorder.setVideoCodec(avcodec.AV_CODEC_ID_FLV1);
	 	recorder.setFormat("flv");
		recorder.setFrameRate(2);
	 	recorder.setPixelFormat(0); 
		recorder.start();
		System.out.println("test...3");
		OpenCVFrameConverter.ToIplImage conveter = new OpenCVFrameConverter.ToIplImage();
		System.out.println("test...4");
		File file = new File(imagesPath);
		File[] flist = file.listFiles();
		System.out.println("test...5 length" + flist);
		for(int i = 0; i < flist.length; i++ ){
			if(flist[i].getName().equals("f1.flv"))
				continue;
			String fname = flist[i].toString();
			System.out.println("test...6" + flist[i]);
			IplImage image = cvLoadImage(fname); 
			System.out.println("test...6.0");
			recorder.record(conveter.convert(image));
			opencv_core.cvReleaseImage(image);
			System.out.println("test...6.1");
		}
		System.out.println("test...7");
		recorder.stop();
		recorder.release();
	}
}
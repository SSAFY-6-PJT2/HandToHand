package com.ssafy.handtohand.controller.image;

import com.ssafy.handtohand.domain.service.image.AwsS3Service;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * S3 이미지 관련 컨트롤러
 *
 * @author Eunee Chung
 * created on 2022-04-04
 */

@Api(tags = "S3 이미지 관련 기능")
@RestController
@RequestMapping("upload")
@RequiredArgsConstructor
public class ImageController {
    private final AwsS3Service awsS3Service;

    @PostMapping
    public String uploadFile(
            @ApiParam(value = "이미지", required = true) @RequestPart(value = "image") MultipartFile multipartFile
    ) {
        return awsS3Service.uploadFile(multipartFile);
    }

}

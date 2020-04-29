package LidarSearch.micronaut;

import io.micronaut.context.annotation.Value;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import java.util.HashMap;
import java.util.Map;

@Controller("/hello")
public class ConfigController {
    @Value("${settings.banner.text}")
    private String bannerText;
    @Value("${settings.banner.color}")
    private String bannerColor;

    @Get
    public Map <String, String> index() {
        Map <String, String> test = new HashMap<>();
        test.put("bannerColor", bannerColor);
        test.put("bannerText", bannerText);
        return test;
    }
}
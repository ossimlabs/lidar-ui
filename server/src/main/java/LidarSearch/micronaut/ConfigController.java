package LidarSearch.micronaut;

import io.micronaut.context.annotation.Value;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import java.util.HashMap;
import java.util.Map;

@Controller("http://lidar-dev.ossim.io/hello")
public class ConfigController {
    @Value("${settings.banner.text}")
    private String bannerText;
    @Value("${settings.banner.background-color}")
    private String bannerBackgroundColor;
    @Value("${settings.banner.text-color}")
    private String bannerTextColor;
    @Value("${settings.banner.font-weight}")
    private String bannerFontWeight;

  @Get
    public Map <String, String> index() {
        Map <String, String> test = new HashMap<>();
        test.put("bannerBackgroundColor", bannerBackgroundColor);
        test.put("bannerText", bannerText);
        test.put("bannerTextColor", bannerTextColor);
        test.put("bannerFontWeight", bannerFontWeight);
        return test;
    }
}
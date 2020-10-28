package LidarSearch.micronaut;

import io.micronaut.context.annotation.Value;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import java.util.HashMap;
import java.util.Map;

@Controller("/settings")
public class ConfigController {

    @Value("${settings.banner.text}")
    private String bannerText;

    @Value("${settings.banner.background-color}")
    private String bannerBackgroundColor;

    @Value("${settings.banner.text-color}")
    private String bannerTextColor;

    @Value("${settings.banner.font-weight}")
    private String bannerFontWeight;

    @Value("${settings.lidar-indexer.url}")
    private String lidarIndexerUrl;

    @Value("${settings.lidar-web-host.url}")
    private String lidarWebHostUrl;

    @Value("${settings.pagination.posts-per-page}")
    private String postsPerPage;

  @Get
    public Map <String, String> index() {
        Map <String, String> settings = new HashMap<>();
        settings.put("bannerBackgroundColor", bannerBackgroundColor);
        settings.put("bannerText", bannerText);
        settings.put("bannerTextColor", bannerTextColor);
        settings.put("bannerFontWeight", bannerFontWeight);
        settings.put("lidarIndexerUrl", lidarIndexerUrl);
        settings.put("lidarWebHostUrl", lidarWebHostUrl);
        settings.put("postsPerPage", postsPerPage);
        return settings;
    }
}
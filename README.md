# lidar-ui
A UI for obtaining converted and indexed LIDAR data.

#### Development

##### Server
1. `cd server` folder
2. `gradle run`
3. To verify that the server is running open a browser: `http://localhost:8080/settings`
4. You should see the following (or similar):
```
{
"bannerBackgroundColor": "green",
"lidarIndexerUrl": "http://lidar-indexer.ossim.io/lidarProducts/findAll",
"bannerText": "Unclassified",
"postsPerPage": "4",
"bannerTextColor": "white",
"bannerFontWeight": "bold"
}
```

##### Client
1. `cd client` folder
2.  `gradle start`
3. This will open your default browser to http://localhost:3000, and enable any changes to html/javascript/css in the
 client folder to be viewed by refreshing the browser.  **Note: It does not hot reload automatically**
 
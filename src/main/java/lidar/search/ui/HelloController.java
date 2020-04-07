package lidar.search.ui;

import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.reactivex.Single;

@Controller("/hello")
public class HelloController implements HelloOperations {

    @Get("/{name}")
    public Single<Greeting> hello(String name){
        Greeting g = new Greeting();
        g.setText("Hello " + name);
        return Single.just(g);
    }
}

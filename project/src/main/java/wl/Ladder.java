package wl;

public class Ladder {
    private final int status;
    private String ladder;

    public Ladder(int s, String l){
        this.status = s;
        this.ladder = l;
    }
    public int getStatus() {
        return status;
    }

    public String getLadder() {
        return ladder;
    }

}

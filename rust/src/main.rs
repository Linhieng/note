fn main() {
    for i in 1..5 {
        print!("{} ", i);
    }
    println!(""); // 1 2 3 4
    for i in 1..=5 {
        print!("{} ", i);
    }
    println!(""); // 1 2 3 4 5
    for c in 'a'..'f' {
        print!("{} ", c);
    }
    println!(""); // a b c d e
    for c in 'a'..='f' {
        print!("{} ", c);
    }
    println!(""); // a b c d e f
}

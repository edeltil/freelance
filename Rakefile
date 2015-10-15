require "rubygems"

desc "Deploy to Github Pages"
task :deploy do
  puts "## Deploying to Github Pages"

  puts "## Generating site"
  system "grunt build:dev"

    system "git add -A"

    message = "Site updated at #{Time.now.utc}"
    puts "## Commiting: #{message}"
    system "git commit -m \"#{message}\""

    puts "## Pushing generated site"
    system "git push"

    puts "## Deploy Complete on master !"


  system "jekyll build --destination ../freelance-gh-pages/"

    cd "../freelance-gh-pages" do

      system "git add -A"

      message = "Site updated at #{Time.now.utc}"
      puts "## Commiting: #{message}"
      system "git commit -m \"#{message}\""

      puts "## Pushing generated site"
      system "git push"

      puts "## Deploy Complete on gh-pages !"
    end


end
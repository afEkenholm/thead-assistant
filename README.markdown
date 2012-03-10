# The &lt;thead&gt; Assistant

The **jQuery `<thead>` Assistant** is a plugin that lets your table header stay in sight while displaying large tables.

Read about the script [over at afEkenholm.se](http://www.afekenholm.se/jquery-thead-assistant).

## Problems when reading large tables

When scrolling through large tables (even if they're interesting) you sometimes get to the point where you forget the order of or the titles of the 100+ columns. As your `<thead>` row gets out of the windows' bounds there's no way to do a quick check. At this time you've got not one, not two, but three issues: 

1. you must scroll up and read the column heading(s),
2. you must keep track of the column(s) as you scroll back down and
3. you must find the place where you stopped reading.

We all have our days, and in case this is one of those days or you haven't had your morning coffee, this will be extremely annoying. In either case, it is not a good user experience and can easily be improved.

## Usage

     $(".selector").theadAssistant({
          // Whether or not to clone the &lt;table&gt; or create an empty one
          cloneTableTag: false,
          // Whether or not to clone the &lt;table&gt;’s data
          cloneTableWithData: false,
          // Whether or not to clone the &lt;thead&gt;’s data
          cloneTHEADWithData: true,
          // Whether or not to set a fixed width to each &lt;th&gt; in the &lt;thead&gt; assistant
          widenTHEADCells: true, 
          // The z-index to assign to the &lt;thead&gt; assistant
          z: 100,
          // The amount of negative offset outside the windows’ bounds before showing the &lt;thead&gt; assistant
          showAtOffset: 0,
          // The &lt;thead&gt; assistant’s fading time
          fadingTime: 100,
          // The interval in milliseconds to check table offsets
          timerInterval: 150, 
          // A function that allows you to modify the cloned &lt;thead&gt; element before assigning event handlers
          cloningFilterFn: null,
          // Disables all styling from within this plugin
          leaveMyCSSAlone: false 
    });
